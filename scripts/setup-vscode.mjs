import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'

const settings = {
  'prettier.enable': false,
  'editor.formatOnSave': false,
  'editor.codeActionsOnSave': {
    'source.fixAll.eslint': 'explicit',
    'source.organizeImports': 'never',
  },
  'eslint.rules.customizations': [
    { rule: 'style/*', severity: 'off', fixable: true },
    { rule: 'format/*', severity: 'off', fixable: true },
    { rule: '*-indent', severity: 'off', fixable: true },
    { rule: '*-spacing', severity: 'off', fixable: true },
    { rule: '*-spaces', severity: 'off', fixable: true },
    { rule: '*-order', severity: 'off', fixable: true },
    { rule: '*-dangle', severity: 'off', fixable: true },
    { rule: '*-newline', severity: 'off', fixable: true },
    { rule: '*quotes', severity: 'off', fixable: true },
    { rule: '*semi', severity: 'off', fixable: true },
  ],
  'eslint.validate': [
    'javascript',
    'javascriptreact',
    'typescript',
    'typescriptreact',
    'vue',
    'html',
    'markdown',
    'json',
    'jsonc',
    'yaml',
    'toml',
    'xml',
    'gql',
    'graphql',
    'astro',
    'svelte',
    'css',
    'less',
    'scss',
    'pcss',
    'postcss',
  ],
}

async function setupVSCode() {
  try {
    const vscodePath = join(process.cwd(), '.vscode')
    const settingsPath = join(vscodePath, 'settings.json')

    try {
      await mkdir(vscodePath, { recursive: true })
    }
    catch (error) {
    }

    let existingSettings = {}
    try {
      const fileContent = await readFile(settingsPath, 'utf8')
      existingSettings = JSON.parse(fileContent)
    }
    catch (error) {
    }

    const mergedSettings = {
      ...existingSettings,
      ...settings,
    }

    await writeFile(
      settingsPath,
      JSON.stringify(mergedSettings, null, 2),
      'utf8',
    )

    console.log('✅ VS Code settings have been successfully configured!')
  }
  catch (error) {
    console.error('❌ Error configuring VS Code settings:', error)
    process.exit(1)
  }
}

setupVSCode()
