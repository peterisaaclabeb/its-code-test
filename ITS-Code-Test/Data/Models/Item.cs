using System.ComponentModel.DataAnnotations;

namespace ITS_Code_Test.Data.Models
{
	public class Item
	{
		public int Id { get; set; }

		[Required]
		public int StepId { get; set; }

		public string Title { get; set; }
		public string Description { get; set; }

		public Step Step { get; set; }
	}
}
