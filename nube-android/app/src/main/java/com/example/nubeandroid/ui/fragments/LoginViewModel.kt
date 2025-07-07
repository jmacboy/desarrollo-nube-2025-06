package com.example.nubeandroid.ui.fragments

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.nubeandroid.repositories.FirebaseAuthRepository
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.launch

open class LoginViewModel : ViewModel() {


    var email by mutableStateOf("")
    var password by mutableStateOf("")
    var loginSuccess by mutableStateOf<Boolean?>(null)
    fun onLoginClick() {
        viewModelScope.launch {
            val result = FirebaseAuthRepository(
                FirebaseAuth.getInstance(),
            ).signInWithEmailAndPassword(
                email = email,
                password = password,
            )
            loginSuccess = result != null
        }
    }
}