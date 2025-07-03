import { execSync } from 'child_process';
import { statSync } from 'fs';

describe('Configuração do Husky', () => {
  it('core.hooksPath deve apontar para .husky/_', () => {
    const hooksPath = execSync('git config --get core.hooksPath').toString().trim();
    expect(hooksPath).toBe('.husky/_');
  });

  it('pre-commit deve ser executável', () => {
    const stat = statSync('.husky/pre-commit');
    // bit de execução para usuário (0o100)
    expect(stat.mode & 0o100).toBeTruthy();
  });
}); 