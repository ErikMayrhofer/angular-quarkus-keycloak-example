package at.erikmayrhofer

import javax.annotation.security.PermitAll
import javax.annotation.security.RolesAllowed
import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
open class ExampleResource {

    @GET
    @PermitAll
    @Path("resource_a")
    open fun resourceA() = ResourceThing("Hello from Resource A")

    @GET
    @Path("resource_b")
    @RolesAllowed("view_b")
    open fun resourceB() = ResourceThing("Hello from Resource B")

    @GET
    @RolesAllowed("view_c")
    @Path("resource_c")
    open fun resourceC() = ResourceThing("Hello from Resource C")
}

data class ResourceThing(val string: String)