import { vueConfig } from '@l_h5_tool/eslint-config'

const config = vueConfig.append({
  rules: {
    'vue/no-deprecated-slot-attribute': 'off',
  },
})

export default config
