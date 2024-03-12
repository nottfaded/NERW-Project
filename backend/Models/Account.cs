using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace backend.Models
{
    public enum Role { Client = 1, Partner, Psychologist, Admin }
    public class Account
    {
        [Key] public int Id { get; set; }
        [Column("roleId")] public Role Role { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Firstname { get; set; } = string.Empty;
        public string Lastname { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string? RepairCode { get; set; }
        public DateTime CreatedCode { get; set; }
        public int Bill { get; set; }
        [MaxLength(6)] public string ReferralCode { get; set; } = string.Empty;
        public int CountReferralAplied { get; set; }
        public List<NotifySetting> NotifySettings { get; set; } = new();


        public PsychologistInfo? PsychologistInfo { get; set; } = null;
    }

    public class NotifySetting
    {
        public string Name { get; set; }
        public bool Mail { get; set; } = false;
        public bool Telegram { get; set; } = false;
        public bool Site { get; set; } = false;
    }
}
