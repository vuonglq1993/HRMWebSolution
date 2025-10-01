using Microsoft.AspNetCore.Mvc;
using server.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController<TCreate, TUpdate, TView, TService> : ControllerBase
        where TService : IBaseService<TCreate, TUpdate, TView>
    {
        protected readonly TService _service;
        public BaseController(TService service) { _service = service; }

        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TView>>> GetAll()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("{id}")]
        public virtual async Task<ActionResult<TView>> GetById(int id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public virtual async Task<ActionResult<TView>> Create([FromBody] TCreate dto)
        {
            var created = await _service.CreateAsync(dto);
            // created DTO should contain Id property for CreatedAtAction; use dynamic to avoid generic constraints
            object idObj = (created as dynamic).Id;
            return CreatedAtAction(nameof(GetById), new { id = idObj }, created);
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Update(int id, [FromBody] TUpdate dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(int id)
        {
            var ok = await _service.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}