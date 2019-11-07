package at.erikmayrhofer

import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
open class UserStuffRepository {

    private val stuffs = mutableListOf<UserStuff>()

    public val allStuff: List<UserStuff>
        get() = stuffs

    fun addStuffForUser(subject: String){
        stuffs.addAll((1..3).map {
            UserStuff("SomeUserStuff $it $subject", subject)
        })
    }

    fun getStuffByUser(subject: String): List<UserStuff>{
        return stuffs.filter { it.owner == subject }
    }
}

data class UserStuff(
        val text: String,
        val owner: String
)