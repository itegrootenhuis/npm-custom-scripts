using CMS.DocumentEngine;
using $BaseNamespace$.Core.Abstractions.Services;
using $BaseNamespace$.Core.Models.PageTypes;


namespace $BaseNamespace$.Services
{
	
	public class $BaseClassName$Service : BaseService<$BaseClassName$Node>, I$BaseClassName$Service
	{
		// Custom methods or overrides on top of the I$BaseClassName$Service, which is itself an ICrudService
		// By inherting BaseService, we get all the basic CRUD stuff for free.  And we can still override:

		//public override DocumentQuery<$BaseClassName$Node> Get( )
		//{
		//	// Never return articles without ordering them by date DESC first, gasp!
		//	return base.Get()
		//			   .OrderByDescending( "DateLastPublished" );
		//}


		// Building off the I$BaseClassName$Service additional method examples, we might do something like this later as needed
		//public $BaseClassName$Node GetFeatured$BaseClassName$( )
		//{
		//	return base.Get()
		//			   .Where( a => a.IsFeatured )
		//			   .FirstObject;
		//}

	}

}
