<template>
    <form @submit.prevent="signin">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" required>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn_go">Sign In</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
</template>

<script> 
import { auth, createUserWithEmailAndPassword } from './firebaseConfig';

export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '' // Nuova variabile per memorizzare il messaggio di errore
        };
    },
    methods: {
        async signin() {
            try {
                // Effettua la registrazione dell'utente
                await auth.createUserWithEmailAndPassword(this.email, this.password);
                // Autentica l'utente utilizzando le credenziali appena create
                await auth.signInWithEmailAndPassword(this.email, this.password);

                // Ora l'utente è autenticato e puoi reindirizzarlo alla sua dashboard o pagina dell'account
                this.$router.push('./App.vue'); // Assicurati di configurare correttamente il router Vue.js e definire la rotta per la dashboard
            } catch (error) {
                // Gestisci gli errori durante la registrazione o l'accesso
                console.error('Registration failed:', error);
                this.errorMessage = error.message; // Mostra il messaggio di errore specifico
            }
        }
    }
}
</script>

<style scoped>
.error-message {
    color: red;
    font-size: 14px;
    margin-top: 8px;
}
</style>
