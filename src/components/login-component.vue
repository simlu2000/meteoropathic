<template>
    <form>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="password">
        </div>
        <button type="submit" class="btn_go" @click="login">Log In</button>
    </form>
</template>

<script> 
export default{
    data() {
        return {
            email: '',
            password: ''
        };
    },

methods: {
    signin() {
        if(this.email === '' || this.password === '') {
            alert('Please fill in all fields')
            return;
        }

        fetch('https://meteoropathic-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.email,
                password: this.password
            }),
        });
        this.email = '';
        this.password = '';
    }
},
}
</script>

