using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace backend.Models
{
    public enum SessionStatus { NotPayed, Payed, Completed, Declined }
    public class Session
    {
        [Key]
        public int Id { get; private set; }
        [ForeignKey(nameof(Client))]
        [Column("fk_client")]
        public int ClientId { get; set; }
        [ForeignKey(nameof(Psycho))]
        [Column("fk_psycho")]
        public int PsychoId { get; set; }
        [MaxLength(13)]
        public string ClientPhone { get; set; }
        public DateTime Date { get; set; }
        public int CountMinutes { get; set; }
        [MaxLength(168)]
        public string? City { get; set; }
        public string? Street { get; set; }
        [Column(TypeName = "enum('NotPayed','Payed','Completed','Declined')")]
        public SessionStatus Status { get; set; }
        //public string? PaymentState { get; set; }
        //public string? ReasonPayment { get; set; }
        public uint Rating { get; set; }



        public Account Client { get; set; }
        public Account Psycho { get; set; }
    }
}
