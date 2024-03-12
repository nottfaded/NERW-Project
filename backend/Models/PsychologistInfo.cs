using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace backend.Models
{
    public class PsychologistInfo
    {
        [Key] public int Id { get; set; }
        public int AccountId { get; set; }
        public int AllCountSession { get; set; }
        public int? Year { get; set; }
        public bool IntramuralMeet { get; set; }
        public bool OnlineMeet { get; set; }
        [MaxLength(20)] public string? City { get; set; }
        [MaxLength(35)] public string? Address { get; set; }
        public int PersonalPrice { get; set; }
        public int PersonalSalary { get; set; }
        public int FamilyPrice { get; set; }
        public int FamilySalary { get; set; }
        public int ChildrenPrice { get; set; }
        public int ChildrenSalary { get; set; }
        public List<string> Languages { get; set; } = new();
        public bool PersonalTherapy { get; set; }
        public bool FamilyTherapy { get; set; }
        public bool ChildrenTherapy { get; set; }
        public bool Activated { get; set; }

        public List<Specialization> Specializations { get; set; } = null!;
        public List<TypeOfTherapy> TypesOfTherapy { get; set; } = new();
        public List<Education> Educations { get; set; } = new();
    }

    public class PsychologistInfoConfiguration : IEntityTypeConfiguration<PsychologistInfo>
    {
        public void Configure(EntityTypeBuilder<PsychologistInfo> builder)
        {
            builder.Property(e => e.Languages)
                .HasConversion(
                v => JsonConvert.SerializeObject(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
                v => JsonConvert.DeserializeObject<List<string>>(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }))
                .Metadata
                .SetValueComparer(new ValueComparer<List<string>>(
                    (c1, c2) => JsonConvert.SerializeObject(c1) == JsonConvert.SerializeObject(c2),
                    c => JsonConvert.SerializeObject(c).GetHashCode(),
                    c => JsonConvert.DeserializeObject<List<string>>(JsonConvert.SerializeObject(c))
                ));


            builder.HasMany(p => p.Specializations)
                .WithMany(s => s.PsychologistsInfo)
                .UsingEntity<Dictionary<string, object>>(
                    "PsychologistInfo_Specialization",
                    j => j.HasOne<Specialization>().WithMany().HasForeignKey("specializationId"),
                    j => j.HasOne<PsychologistInfo>().WithMany().HasForeignKey("psychId"),
                    j =>
                    {
                        j.HasKey("psychId", "specializationId");
                        j.ToTable("PsychologistInfo_Specialization");
                    });

            builder.HasMany(p => p.TypesOfTherapy)
                .WithMany(t => t.PsychologistInfos)
                .UsingEntity<Dictionary<string, object>>(
                    "psychologistinfo_typeoftherapy",
                    i => i.HasOne<TypeOfTherapy>().WithMany().HasForeignKey("typeTherapyId"),
                    i => i.HasOne<PsychologistInfo>().WithMany().HasForeignKey("psychId"),
                    i =>
                    {
                        i.HasKey("psychId", "typeTherapyId");
                        i.ToTable("psychologistinfo_typeoftherapy");
                    });
        }
    }

}
