using System.Web;
using BizStream.Core.Services;
//using $BaseNamespace$.Core.Abstractions.Services;
//using $BaseNamespace$.Core.Models.PageTypes;
//using $BaseNamespace$.Web.ViewModels;


namespace $BaseNamespace$.Web.Populaters
{

	internal class $BaseClassName$Populater //: TreeNodePopulater<$BaseClassName$ViewModel, $BaseClassName$Node, I$BaseClassName$Service>
	{

		#region Fields
		private readonly ICurrentNodeProvider currentNodeProvider;
		#endregion


		#region Properties
			public override string ViewName { get; protected set; } = "$BaseClassName$/Detail";
		#endregion

		
		public $BaseClassName$Populater(
			ICurrentNodeProvider currentNodeProvider
		) : base( httpContext )
		{
		}


		public new $BaseClassName$ViewModel Populate( )
		{
			$BaseClassName$Node node = currentNodeProvider.GetCurrentNode<$BaseClassName$Node> ();
			if( node == null )
			{
				return null;
			}

			base.PopulateViewModel();

			return ViewModel;
		}

	}

}