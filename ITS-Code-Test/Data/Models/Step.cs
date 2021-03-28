using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ITS_Code_Test.Data.Models
{
	public class Step
	{
		public int Id { get; set; }

		[ForeignKey("StepId")]
		public List<Item> Items { get; set; }

		public Step()
		{
			Items = new List<Item>();
		}
	}
}
