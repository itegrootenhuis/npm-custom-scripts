using System.Linq;
using System.Web;
using BizStream.Core.Mappers;
using BizStream.Core.Services;
using $BaseNamespace$.Core.Abstractions.Services;
using $BaseNamespace$.Core.Models.PageTypes;
using $BaseNamespace$.Web.Models;
using $BaseNamespace$.Web.ViewModels;


namespace $BaseNamespace$.Web.Populaters
{

	public class $BaseClassName$LandingPopulater : TreeNodePopulater<$BaseClassName$LandingViewModel, $BaseClassName$LandingNode, I$BaseClassName$LandingService>
	{
		public override string PageType { get; } = "$baseclassname$";
		public override string ViewName { get; } = "$BaseClassName$/Index";


		public $BaseClassName$LandingPopulater( HttpContextBase httpContext ) : base( httpContext )
		{
		}



		public new $BaseClassName$LandingViewModel Populate( )
		{
			InitViewModel();
			Populate$BaseClassNamePlural$();
			base.Populate();

			return ViewModel;
		}


		private void Populate$BaseClassNamePlural$( )
		{
			ViewModel.$BaseClassNamePlural$ = ServiceLocator.Get<I$BaseClassName$Service>()
											   .GetByParent( ViewModel.NodeID )
											   .Select( a => Mapper.Map<PagePreview>( a ) )
											   .ToList();

			// Set each $baseclassname$'s read more text
			// TODO: Add a Kentico field for overriding this and handle blank values for it with this default value (placed elsewhere instead
			// of a magic string)
			ViewModel.$BaseClassNamePlural$.ForEach( a =>
			{
				a.ReadMoreLabel = "Read More";

				// TODO: Temp until Title field added and automapped
				a.Title = "This would be a real title";
			} );
		}
	}

}