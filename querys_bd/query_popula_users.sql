INSERT INTO public.users (name, email, password, cpf, login, birthdate)
SELECT
    'Nome ' || generate_series,
    'email' || generate_series || '@exemplo.com',
    'senha' || generate_series,
    'CPF' || generate_series,
    'login' || generate_series,
    to_date('01-01-1990', 'DD-MM-YYYY') + (generate_series || ' days')::interval
FROM generate_series(1, 500);
