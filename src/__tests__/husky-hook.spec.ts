import { execSync } from 'child_process';

describe('Husky pre-commit hook', () => {
  it('deve ser executado em um commit vazio', () => {
    // SHA atual para reset posterior
    const before = execSync('git rev-parse HEAD').toString().trim();

    // Configura variáveis de autor caso CI não tenha
    const env = {
      ...process.env,
      GIT_AUTHOR_NAME: 'husky-test',
      GIT_AUTHOR_EMAIL: 'husky@test.com',
      GIT_COMMITTER_NAME: 'husky-test',
      GIT_COMMITTER_EMAIL: 'husky@test.com',
    };

    try {
      // Commit vazio (hook deve rodar)
      execSync('git commit --allow-empty -m "test: husky hook e2e"', { stdio: 'pipe', env });
    } finally {
      // Volta ao estado anterior sem apagar alterações locais
      execSync(`git reset --soft ${before}`);
    }
  });
}); 