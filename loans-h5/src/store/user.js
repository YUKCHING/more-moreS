// 管理用户相关状态
import { getStorageByKey, setStorageByKey } from '@/common/base/storage'

const tokenKey = 'token'

const user = {
  state: {
    token: process.env.NODE_ENV === 'production' ? getStorageByKey(tokenKey) : 'eyJpdiI6ImNEbE9KeXZ4RlVReFFOS1JmRXJIRlE9PSIsInZhbHVlIjoiSFMyQ1BZWVwvQ0lMdXR4ME0wbmdpMUV4V081dVNkK01cL1FlaUU3aFM0QnRvPSIsIm1hYyI6IjUxYWFiYTJmNWFlNWEyYjE5ZTIzOTNkMGUxZjM5YzEyMGYyMjY3MDcxNjdlNDc4NzEwNWMzNmNhNzNhNjljZWEifQ=='
  },

  mutations: {
    SET_TOKEN (state, { token }) {
      state.token = token
    }
  },
  actions: {
    setToken ({ commit }, { token }) {
      commit('SET_TOKEN', { token })
      setStorageByKey(tokenKey, token)
    }
  }
}

export default user
