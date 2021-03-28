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
	public class StepController : ControllerBase
	{
		private readonly ILogger<StepController> _logger;
		private readonly CodeTestContext _codeTestContext;

		public StepController(ILogger<StepController> logger, CodeTestContext codeTestContext)
		{
			_logger = logger ?? throw new ArgumentNullException(nameof(logger));
			_codeTestContext = codeTestContext ?? throw new ArgumentNullException(nameof(codeTestContext));
		}

		[HttpGet]
		public ActionResult<List<Step>> Get()
		{
			var steps = _codeTestContext.Steps.ToList();
			return Ok(steps);
		}

		[HttpGet("{id}")]
		public ActionResult<Step> Get(int id)
		{
			var step = _codeTestContext.Steps.Find(id);
			return Ok(step);

		}

		[HttpPost]
		public ActionResult<Step> Post()
		{
			var newStep = new Step { };

			_codeTestContext.Steps.Add(newStep);
			_codeTestContext.SaveChanges();

			return Ok(newStep);
		}


		[HttpDelete("{id}")]
		public ActionResult Delete(int id)
		{
			var step = _codeTestContext.Steps.Find(id);

			_codeTestContext.Steps.Remove(step);
			_codeTestContext.SaveChanges();

			return Ok();
		}
	}
}
