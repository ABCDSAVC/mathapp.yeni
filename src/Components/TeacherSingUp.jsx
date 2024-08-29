import React, { useState } from 'react';
import { Flex, Box, Heading, FormControl, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function TeacherSingUp() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    Lessons: '',
    password: '',
    passwordConfirm: '',
    birthDate: '',
    Şehir: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  //porala koşulları
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return `Parola en az ${minLength} karakter uzunluğunda olmalı.`;
    }
    if (!hasUpperCase) {
      return "Parola en az bir büyük harf içermeli.";
    }
    if (!hasLowerCase) {
      return "Parola en az bir küçük harf içermeli.";
    }
    if (!hasNumber) {
      return "Parola en az bir sayı içermeli.";
    }
    if (!hasSpecialChar) {
      return "Parola en az bir özel karakter içermeli.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Önceki hataları temizle

    // Form verilerini doğrula
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.username || !formData.password || !formData.passwordConfirm) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    // Parola koşullarını kontrol et
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError("Parolalar eşleşmiyor!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5177/signup/TeacherSingUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          Lessons: formData.Lessons,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
          birthDate: formData.birthDate,
          Şehir: formData.Şehir
        })
      });

      if (response.ok) {
        alert("Kayıt başarılı!");
        navigate('/'); // Ana sayfaya yönlendirme
      } else {
        alert("Kayıt başarısız oldu.");
      }
    } catch (error) {
      console.error("Kayıt sırasında hata:", error);
      setError("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className='mt-5'>
      <Flex align='center' width='full' justifyContent='center'>
        <Box pt={10}>
          <Box my={12} textAlign='center' mt='12'>
            <form onSubmit={handleSubmit} className="LoginglassCard">
              <FormControl mt='12' mb='5'>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="forms rounded-full"
                  placeholder="Mail"
                  textAlign='center'
                  textColor='black'
                />
              </FormControl>
              <FormControl mt='12' mb='5'>
                <Input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="forms rounded-full"
                  placeholder="Ad"
                  textAlign='center'
                  textColor='black'
                />
              </FormControl>
              <FormControl mt='12' mb='5'>
                <Input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="forms rounded-full"
                  placeholder="Soyad"
                  textAlign='center'
                  textColor='black'
                />
              </FormControl>
              <FormControl mt='12' mb='5'>
                <Input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="forms rounded-full"
                  placeholder="Kullanıcı Adı"
                  textAlign='center'
                  textColor='black'
                />
              </FormControl>
              <FormControl mt='12' mb='5'>
                <Input
                  name="Lessons"
                  type="text"
                  value={formData.Lessons}
                  onChange={handleChange}
                  className="forms rounded-full"
                  placeholder="Ders"
                  textAlign='center'
                  textColor='black'
                />
              </FormControl>
              <FormControl mt='12' mb='5'>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="forms rounded-full"
                  placeholder="Şifre"
                  textAlign='center'
                  textColor='black'
                />
              </FormControl>
              <ul>
                <li>Parola en az bir büyük harf içermeli.</li>
                <li>Parola en az bir küçük harf içermeli.</li>
                <li>Parola en az bir sayı içermeli.</li>
                <li>Parola en az bir özel karakter içermeli.</li>
                <li>Parola en az 8 karakter uzunluğunda olmalı.</li>
              </ul>
              <FormControl mt='12' mb='5'>
                <Input
                  name="passwordConfirm"
                  type="password"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  className="forms rounded-full"
                  placeholder="Şifre Tekrar"
                  textAlign='center'
                  textColor='black'
                />
              </FormControl>
              <FormControl mt='12' mb='5'>
                <Input
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  placeholder="Doğum Tarihi"
                  textAlign='center'
                  textColor='black'
                  className="forms rounded-full"
                  min="1950-01-01"
                  max={new Date().toISOString().split("T")[0]}
                />
              </FormControl><FormControl mt='12' mb='5'>
                <Input
                  name="Şehir"
                  type="text"
                  value={formData.Şehir}
                  onChange={handleChange}
                  placeholder="Şehir"
                  textAlign='center'
                  textColor='black'
                  className="forms rounded-full"
                />
              </FormControl>
              {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hata mesajı */}

              <button type="submit" className="signUp rounded-full">
                Kayıt ol
              </button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default TeacherSingUp;
