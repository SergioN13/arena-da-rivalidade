# ⚔️ Arena da Rivalidade

Placar público de competição entre Você e Gabriel.

## Stack

- HTML
- CSS
- JavaScript ES Modules
- Firebase Firestore
- Firebase Authentication
- GitHub Pages

## 1. Criar Firebase

1. Acesse o console do Firebase.
2. Crie um projeto.
3. Crie um aplicativo Web.
4. Copie a configuração do Firebase.
5. Cole em `js/firebase.js`.
6. Em **Authentication > Sign-in method**, habilite **E-mail/Senha**.
7. Em **Authentication > Users**, crie o usuário que será usado no painel `/admin`.
8. Crie o Firestore Database.
9. Publique as regras do arquivo `firestore.rules`.

## 2. Firestore

Crie a coleção:

`competicoes`

Não precisa criar documentos manualmente. O painel administrativo cria automaticamente.

Campos usados:

- `nome`
- `vencedor` = `voce` ou `gabriel`
- `data`
- `criadoEm`

## 3. GitHub Pages

Envie todos os arquivos para um repositório GitHub.

Depois:

Settings > Pages > Deploy from a branch > `main` > `/ (root)` > Save.

O site público será `https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/`.

## 4. Painel

Abra:

`https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/admin.html`

Entre com o usuário criado no Firebase Authentication.

## 5. Primeiro resultado

Registre:

- Nome: Touro Mecânico
- Vencedor: Gabriel
- Data: a data da competição

O placar ficará:

GABRIEL 1 × 0 VOCÊ

## Observação de segurança

A `firebaseConfig` do aplicativo Web não é uma senha secreta. A segurança deve ser feita pelas regras do Firestore e pelo Firebase Authentication.

Para um projeto simples de placar, estas regras permitem leitura pública e escrita apenas para usuários autenticados.
