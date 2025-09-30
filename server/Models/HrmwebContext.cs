using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

public partial class HrmwebContext : DbContext
{
    public HrmwebContext()
    {
    }

    public HrmwebContext(DbContextOptions<HrmwebContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Applypost> Applyposts { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<Cv> Cvs { get; set; }

    public virtual DbSet<FollowCompany> FollowCompanies { get; set; }

    public virtual DbSet<Recruitment> Recruitments { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<SaveJob> SaveJobs { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost,1433;Database=HRMWeb;User Id=sa;Password=1@Uuuvkmqke;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Applypost>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__applypos__3213E83FB4D8D4A4");

            entity.ToTable("applypost");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("created_at");
            entity.Property(e => e.NameCv)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name_cv");
            entity.Property(e => e.RecruitmentId).HasColumnName("recruitment_id");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Text)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("text");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Recruitment).WithMany(p => p.Applyposts)
                .HasForeignKey(d => d.RecruitmentId)
                .HasConstraintName("FK__applypost__recru__5165187F");

            entity.HasOne(d => d.User).WithMany(p => p.Applyposts)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__applypost__user___52593CB8");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__category__3213E83FF415504F");

            entity.ToTable("category");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Company>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__company__3213E83F390A2EA9");

            entity.ToTable("company");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("address");
            entity.Property(e => e.Description)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Logo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("logo");
            entity.Property(e => e.NameCompany)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name_company");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("phone_number");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Companies)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__company__user_id__412EB0B6");
        });

        modelBuilder.Entity<Cv>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__cv__3213E83FD0EFAC10");

            entity.ToTable("cv");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FileName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("file_name");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<FollowCompany>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__follow_c__3213E83FED6B84C5");

            entity.ToTable("follow_company");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CompanyId).HasColumnName("company_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Company).WithMany(p => p.FollowCompanies)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK__follow_co__compa__4D94879B");

            entity.HasOne(d => d.User).WithMany(p => p.FollowCompanies)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__follow_co__user___4E88ABD4");
        });

        modelBuilder.Entity<Recruitment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__recruitm__3213E83F775B1FA4");

            entity.ToTable("recruitment");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("address");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CompanyId).HasColumnName("company_id");
            entity.Property(e => e.CreatedAt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("created_at");
            entity.Property(e => e.Deadline)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("deadline");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.Experience)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("experience");
            entity.Property(e => e.Quantity)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("quantity");
            entity.Property(e => e.Rank)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("rank");
            entity.Property(e => e.Salary)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("salary");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("title");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("type");
            entity.Property(e => e.Views).HasColumnName("views");

            entity.HasOne(d => d.Category).WithMany(p => p.Recruitments)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__recruitme__categ__45F365D3");

            entity.HasOne(d => d.Company).WithMany(p => p.Recruitments)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK__recruitme__compa__46E78A0C");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__role__3213E83FA6D8430B");

            entity.ToTable("role");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.RoleName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("role_name");
        });

        modelBuilder.Entity<SaveJob>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__save_job__3213E83FE1945EEB");

            entity.ToTable("save_job");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.RecruitmentId).HasColumnName("recruitment_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Recruitment).WithMany(p => p.SaveJobs)
                .HasForeignKey(d => d.RecruitmentId)
                .HasConstraintName("FK__save_job__recrui__49C3F6B7");

            entity.HasOne(d => d.User).WithMany(p => p.SaveJobs)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__save_job__user_i__4AB81AF0");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__user__3213E83F291EA9F4");

            entity.ToTable("user");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("address");
            entity.Property(e => e.Description)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("full_name");
            entity.Property(e => e.Image)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("image");
            entity.Property(e => e.Password)
                .HasMaxLength(128)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("phone_number");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__user__role_id__3E52440B");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
