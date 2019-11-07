package at.erikmayrhofer

import io.quarkus.security.Authenticated
import io.smallrye.jwt.auth.principal.JWTCallerPrincipal
import javax.inject.Inject
import javax.ws.rs.GET
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.Context
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.SecurityContext


@Path("/api/user")
@Authenticated
@Produces(MediaType.APPLICATION_JSON)
open class UserSpecificResource {

    @Inject
    lateinit var userStuffRepository: UserStuffRepository

    @GET
    @Path("whoami")
    open fun whoami(@Context sec: SecurityContext): ResourceThing{
        val user = sec.userPrincipal as JWTCallerPrincipal
        return ResourceThing("${sec.authenticationScheme}, ${user.name}, ${user.subject}")
    }

    @POST
    open fun stuff(@Context sec: SecurityContext) {
        val user = sec.userPrincipal as JWTCallerPrincipal

        userStuffRepository.addStuffForUser(user.subject)
    }

    @GET
    open fun getstuff(@Context sec: SecurityContext): List<UserStuff> {
        val user = sec.userPrincipal as JWTCallerPrincipal

        return userStuffRepository.getStuffByUser(user.subject)
    }
}