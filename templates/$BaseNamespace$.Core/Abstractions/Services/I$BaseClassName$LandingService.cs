using $BaseNamespace$.Core.Models.PageTypes;


namespace $BaseNamespace$.Core.Abstractions.Services
{

	public interface I$BaseClassName$LandingService : INodeService<$BaseClassName$LandingNode>
	{
		// Even tho right now we have no extra methods to add to the INodeService, we often will as the project
		// continues, so we create this stub interface right now to use in the rest of the application, even if
		// just as a 'marker' interface for now.

		//$BaseClassName$Node GetThatOne( );
		//$BaseClassName$Node GetFeatured( );		/// i.e., business logic
	}

}
