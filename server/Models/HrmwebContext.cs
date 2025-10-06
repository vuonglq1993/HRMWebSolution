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
        => optionsBuilder.UseSqlServer("Server=localhost,1433;Database=HRMWeb;User Id=sa;Password=1@Uuuvkmqke;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Applypost>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__applypos__3213E83F134D7CAC");

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
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__applypost__recru__4F7CD00D");

            entity.HasOne(d => d.User).WithMany(p => p.Applyposts)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__applypost__user___5070F446");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__category__3213E83F17A01FE0");

            entity.ToTable("category");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.NumberChoose).HasColumnName("number_choose");
        });

        modelBuilder.Entity<Company>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__company__3213E83FC620536F");

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
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__company__user_id__3F466844");
        });

        modelBuilder.Entity<Cv>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__cv__3213E83F56489319");

            entity.ToTable("cv");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FileName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("file_name");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Cvs)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__cv__user_id__3C69FB99");
        });

        modelBuilder.Entity<FollowCompany>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__follow_c__3213E83F2D8171FB");

            entity.ToTable("follow_company");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CompanyId).HasColumnName("company_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Company).WithMany(p => p.FollowCompanies)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__follow_co__compa__4BAC3F29");

            entity.HasOne(d => d.User).WithMany(p => p.FollowCompanies)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__follow_co__user___4CA06362");
        });

        modelBuilder.Entity<Recruitment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__recruitm__3213E83FBD0A5131");

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
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__recruitme__categ__440B1D61");

            entity.HasOne(d => d.Company).WithMany(p => p.Recruitments)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__recruitme__compa__44FF419A");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__role__3213E83FF6C56BF3");

            entity.ToTable("role");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.RoleName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("role_name");
        });

        modelBuilder.Entity<SaveJob>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__save_job__3213E83F296D4BF1");

            entity.ToTable("save_job");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.RecruitmentId).HasColumnName("recruitment_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Recruitment).WithMany(p => p.SaveJobs)
                .HasForeignKey(d => d.RecruitmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__save_job__recrui__47DBAE45");

            entity.HasOne(d => d.User).WithMany(p => p.SaveJobs)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__save_job__user_i__48CFD27E");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__user__3213E83F9318F4F8");

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
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__user__role_id__398D8EEE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
