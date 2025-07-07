package com.example.nubeandroid.repositories

import com.google.firebase.auth.AuthResult
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.tasks.await

class FirebaseAuthRepository(
    private var auth: FirebaseAuth,
) {
    suspend fun signInWithEmailAndPassword(
        email: String,
        password: String
    ): AuthResult? {
        return auth.signInWithEmailAndPassword(email, password).await()
    }
}