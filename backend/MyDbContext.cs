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
        public DbSet<PsychologistInfo> PsychologistInfo { get; set; }
        public DbSet<Specialization> Specializations { get; set; }
        //public DbSet<Language> Languages { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<TypeOfTherapy> TypesOfTherapy { get; set; }
        public DbSet<Education> Educations { get; set; }

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
                    c => JsonConvert.SerializeObject(c).GetHashCode(),
                    c => JsonConvert.DeserializeObject<List<NotifySetting>>(JsonConvert.SerializeObject(c))
                ));


            modelBuilder.ApplyConfiguration(new PsychologistInfoConfiguration());
            
            // psychInfo to specialization Many to many
            //modelBuilder.Entity<PsychologistInfo>()
            //    .HasMany(p => p.Specializations)
            //    .WithMany(s => s.PsychologistsInfo)
            //    .UsingEntity<Dictionary<string, object>>(
            //        "PsychologistInfo_Specialization",
            //        j => j.HasOne<Specialization>().WithMany().HasForeignKey("specializationId"),
            //        j => j.HasOne<PsychologistInfo>().WithMany().HasForeignKey("psychInfoId"),
            //        j =>
            //        {
            //            j.HasKey("psychInfoId", "specializationId");
            //            j.ToTable("PsychologistInfo_Specialization");
            //        });

            // psychInfo to lagnuage Many to many
            //modelBuilder.Entity<PsychologistInfo>()
            //    .HasMany(p => p.Languages)
            //    .WithMany(l => l.PsychologistsInfo)
            //    .UsingEntity<Dictionary<string, object>>(
            //        "psychologistinfo_language",
            //        i => i.HasOne<Language>().WithMany().HasForeignKey("languageId"),
            //        i => i.HasOne<PsychologistInfo>().WithMany().HasForeignKey("psychInfoId"),
            //        i =>
            //        {
            //            i.HasKey("psychInfoId", "languageId");
            //            i.ToTable("psychologistinfo_language");
            //        });

        }

        public async Task<string?> TrySaveChanges()
        {
            try
            {
                await SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return $"message: {(ex.InnerException == null ? ex.Message : ex.InnerException.Message)}\nstack: {ex.StackTrace}";
            }

            return null;
        }
    }
}
