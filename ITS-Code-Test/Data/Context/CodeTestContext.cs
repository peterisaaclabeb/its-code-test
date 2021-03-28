using ITS_Code_Test.Data.Models;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITS_Code_Test.Data.Context
{
	public class CodeTestContext : DbContext
	{
		public DbSet<Step> Steps { get; set; }
		public DbSet<Item> Items { get; set; }

		public CodeTestContext(DbContextOptions<CodeTestContext> options) : base(options)
		{
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{

		}
	}


}
