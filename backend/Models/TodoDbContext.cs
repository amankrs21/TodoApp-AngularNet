using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
    {
    }

    public DbSet<Users>? Users { get; set; }
    public DbSet<Todo>? Todos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Todo>()
            .HasOne(t => t.User)
            .WithMany(u => u.Todos)
            .HasForeignKey(t => t.CreatedBy)
            .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<Users>()
            .HasIndex(u => u.Username)
            .IsUnique();

        base.OnModelCreating(modelBuilder);
    }
}

public class Users
{
    [Key] public int Id { get; set; }
    [Required, MaxLength(200)] public string Username { get; set; } = string.Empty;
    [Required, MaxLength(500)] public string Password { get; set; } = string.Empty;
    [Required, MaxLength(100)] public string Name { get; set; } = string.Empty;
    [Required] public bool IsAdmin { get; set; }
    [Required] public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<Todo>? Todos { get; set; }
}

public class Todo
{
    [Key] public int Id { get; set; }
    [Required, MaxLength(200)] public string Title { get; set; } = string.Empty;
    [Required, MaxLength(500)] public string Description { get; set; } = string.Empty;
    [Required] public bool IsDone { get; set; }
    [ForeignKey("CreatedBy")] public int CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    [InverseProperty("Todos")] public Users? User { get; set; }
}