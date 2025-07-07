package com.example.nubeandroid.ui.composables

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.nubeandroid.ui.fragments.LoginViewModel

@Composable
fun LoginScreen(viewModel: LoginViewModel) {
    val email by remember { derivedStateOf { viewModel.email } }
    val password by remember { derivedStateOf { viewModel.password } }
    val loginSuccess = viewModel.loginSuccess
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        TextField(
            modifier = Modifier.fillMaxWidth(),
            value = email,
            singleLine = true,
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Email,
                imeAction = ImeAction.Next,
            ),
            onValueChange = { viewModel.email = it },
            label = { Text("Email") }
        )
        TextField(
            modifier = Modifier.fillMaxWidth(),
            value = password,
            singleLine = true,
            onValueChange = { viewModel.password = it },
            visualTransformation = PasswordVisualTransformation(),
            label = { Text("Password") }
        )
        Button(
            modifier = Modifier.fillMaxWidth(),
            onClick = { viewModel.onLoginClick() }
        ) {
            Text("Login")
        }
        when (loginSuccess) {
            true -> Text("Login successful!", style = MaterialTheme.typography.bodyLarge)
            false -> Text(
                "Login failed. Please try again.",
                style = MaterialTheme.typography.bodyLarge
            )

            null -> Text(
                "Please enter your credentials.",
                style = MaterialTheme.typography.bodyLarge
            )
        }


    }
}

@Preview
@Composable
fun PreviewLoginScreen() {
    val viewModel = object : LoginViewModel() {
        init {
            // Initialize with some test data
            this.email = "test@test.com"
            this.password = "password123"
        }
    }
    MaterialTheme {
        LoginScreen(viewModel)
    }
}