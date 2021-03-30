using ITS_Code_Test.Data.Context;
using ITS_Code_Test.Data.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;

namespace ITS_Code_Test.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class ItemController : ControllerBase
	{
		private readonly ILogger<ItemController> _logger;
		private readonly CodeTestContext _codeTestContext;

		public ItemController(ILogger<ItemController> logger, CodeTestContext codeTestContext)
		{
			_logger = logger ?? throw new ArgumentNullException(nameof(logger));
			_codeTestContext = codeTestContext ?? throw new ArgumentNullException(nameof(codeTestContext));
		}

		[HttpGet("[action]/{id}")]
		public ActionResult<List<Item>> GetByStepId(int id)
		{
			var steps = _codeTestContext.Items
				.Where(x => x.StepId == id)
				.ToList();

			return Ok(steps);
		}

		[HttpGet("{id}")]
		public ActionResult<Item> Get(int id)
		{
			var step = _codeTestContext.Items.Find(id);
			return Ok(step);

		}

		[HttpPost]
		public ActionResult<Item> Post(Item item)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest();
			}

			_codeTestContext.Items.Add(item);
			_codeTestContext.SaveChanges();

			return Ok(item);
		}

		[HttpPut]
		public ActionResult<Item> Put(Item item)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest();
			}

			_codeTestContext.Items.Update(item);
			_codeTestContext.SaveChanges();

			return Ok(item);
		}


		[HttpDelete("{id}")]
		public ActionResult Delete(int id)
		{
			var item = _codeTestContext.Items.Find(id);

			_codeTestContext.Items.Remove(item);
			_codeTestContext.SaveChanges();

			return Ok();
		}
	}
}
