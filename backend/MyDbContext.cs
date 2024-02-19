using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;

namespace backend
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Session> Sessions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var notifySettingsConverter = new ValueConverter<List<NotifySetting>, string>(
                v => JsonConvert.SerializeObject(v),
                v => JsonConvert.DeserializeObject<List<NotifySetting>>(v) ?? new List<NotifySetting>()
            );

            modelBuilder.Entity<Account>()
                .Property(e => e.NotifySettings)
                .HasConversion(notifySettingsConverter)
                .Metadata
                .SetValueComparer(new ValueComparer<List<NotifySetting>>(
                    (c1, c2) => JsonConvert.SerializeObject(c1) == JsonConvert.SerializeObject(c2),
                    c => c == null ? 0 : JsonConvert.SerializeObject(c).GetHashCode(),
                    c => JsonConvert.DeserializeObject<List<NotifySetting>>(JsonConvert.SerializeObject(c))
                ));

        }
    }
}
