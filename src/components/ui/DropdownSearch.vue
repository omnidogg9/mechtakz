<template>
  <div class="dropdown-search">
    <div
      class="dropdown-search__wrapper"
      :class="{
        'dropdown-search__wrapper--focused': isOpen && filteredOptions.length > 0,
        'dropdown-search__wrapper--error': showError
      }"
    >
      <div class="dropdown-search__input">
        <input
          name="ds"
          v-model="searchText"
          placeholder="Enter name of the city"
          @focus="onFocus"
          @blur="onBlur"
          @input="handleInput"
        />
        <button :class="showError ? 'error' : 'normal'" @click="handleButtonClick">
          <span class="btn-txt" v-if="!showError && !selectedOptionVal">{{ buttonText }}</span>
          <mdicon v-else name="close" class="btn-icon" />
        </button>
      </div>
    </div>
    <div
      class="dropdown-search__optionlist"
      :class="{ error: showError }"
      v-if="isOpen && filteredOptions.length > 0"
    >
      <ul>
        <li
          v-for="(option, index) in filteredOptions"
          :key="index"
          class="dropdown-search__optionlist-item"
          @mousedown="selectOption(option, $event)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
    <p class="dropdown-search_error">We didn’t found such city. Please check spelling</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import useAxios from '../../composables/useAxios'
import { useDeliveryStore } from '../../../store/deliveryStore'
interface Option {
  label: string
  value: string
}

export default defineComponent({
  name: 'DropdownSearch',
  props: {
    options: {
      type: Array as () => Option[],
      required: true
    }
  },
  setup(props) {
    const axios = useAxios()
    const searchText = ref('')
    const isOpen = ref(false)
    const showError = ref(false)
    const selectedOptionVal = ref('')
    const deliveryStore = useDeliveryStore()
    const buttonText = computed(() => {
      if (selectedOptionVal.value !== '') {
        return 'DELETE'
      } else if (showError.value) {
        return 'DELETE'
      } else {
        return 'ENTER'
      }
    })

    watch(searchText, (newValue, oldValue) => {
      if (showError.value && newValue !== '' && newValue !== oldValue) {
        showError.value = false
      }
    })

    const filteredOptions = computed(() => {
      return props.options.filter((option) =>
        option.label.toLowerCase().includes(searchText.value.toLowerCase())
      )
    })

    const handleInput = () => {
      if (selectedOptionVal.value !== '') {
        selectedOptionVal.value = ''
      }
    }

    const handleButtonClick = async () => {
      if (selectedOptionVal.value !== '' || showError.value) {
        showError.value = false
        searchText.value = ''
        selectedOptionVal.value = ''
        return
      }

      const selectedOption = filteredOptions.value.find(
        (option) => option.label === searchText.value
      )

      if (selectedOption) {
        try {
          const response = await axios.get<any>(
            `https://frontend-test.dev.mechta.kz/delivery/check?search=${selectedOption.value}`
          )
          console.log('API response:', response)
          await deliveryStore.setDeliveryOptions(response)
          selectedOptionVal.value = searchText.value
          showError.value = false
        } catch (error) {
          showError.value = true
          console.error('Error fetching data:', error)
        }
      } else {
        showError.value = true
      }
    }

    const selectOption = (option: Option, event: MouseEvent) => {
      searchText.value = option.label
      isOpen.value = false
    }

    const onFocus = () => {
      isOpen.value = true
    }

    const onBlur = () => {
      isOpen.value = false
    }

    return {
      searchText,
      selectedOptionVal,
      buttonText,
      filteredOptions,
      isOpen,
      showError,
      handleInput,
      handleButtonClick,
      selectOption,
      onFocus,
      onBlur
    }
  }
})
</script>

<style lang="scss" scoped>
.dropdown-search {
  display: flex;
  flex-direction: column;
  position: relative;

  &__wrapper {
    border: 1px solid $c-line;
    background: white;
    border-radius: $border-radius;
    display: flex;
    flex-direction: row;
    overflow: hidden;

    &--focused {
      box-shadow: $box-shadow;
      border-radius: 32px 32px 0 0;
      border-color: transparent;
      border-bottom: none;
      @include phone {
        border-radius: 26px 26px 0 0;
      }
    }

    &--error {
      border-color: $c-error;
    }
  }

  &__input {
    width: 100%;
    display: flex;
    flex-direction: row;
    background: white;
    z-index: 50;

    input {
      padding: 0 26px;
      outline-style: none;
      border: none;
      width: 100%;
      border-radius: inherit;
      font-size: 24px;
      color: $c-text;
      font-weight: 700;
      height: 63px;
      @include phone {
        font-size: 16px;
        height: 50px;
        padding: 0 18px;
      }

      &::placeholder {
        font-size: 24px;
        color: $c-text-secondary;
        font-weight: 400;
        padding: none;
        line-height: 30px;
        @include phone {
          font-size: 16px;
        }
      }
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 700;
      color: white;
      border: none;
      border-radius: $border-radius;
      z-index: 40;
      cursor: pointer;
      padding: 0 1rem;

      &.normal {
        background: linear-gradient(279.56deg, #65b3e4 15.15%, rgba(120, 161, 187, 0) 171.55%);
      }

      &.error {
        background: linear-gradient(279.56deg, #ff4757 15.15%, rgba(255, 255, 255, 0) 171.55%);
      }

      .btn-txt {
        padding: 0 1.5rem;
      }

      .btn-icon {
        :deep(svg) {
          width: 32px;
          height: 32px;
          @include phone {
            width: 28px;
            height: 28px;
          }
        }
      }
      @include phone {
        font-size: 16px;
        padding: 0;
        min-width: 50px;
        .btn-txt {
          padding: 0 2rem;
        }
      }
    }
  }

  &__optionlist {
    display: flex;
    flex-direction: column;
    position: absolute;
    box-shadow: $box-shadow;
    background: white;
    top: 100%;
    width: 100%;
    z-index: 40;
    font-size: 20px;
    border-radius: 0 0 32px 32px;
    @include phone {
      font-size: 16px;
      border-radius: 0 0 26px 26px;
    }

    ul {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0 1rem 1rem 1rem;

      li {
        padding: 1rem 1rem;
        border-top: 1px solid $c-line;
        display: flex;
        align-items: center;
        @include phone {
          padding: 0.7rem 0;
          &:first-child {
            border-top: 0;
          }
          &:last-child {
            padding-bottom: 0;
          }
        }

        &:hover {
          background: rgb(229, 229, 229);
          cursor: pointer;
        }
      }
    }

    &.error {
      border: 1px solid $c-error;
      border-top: none;
    }
  }
  &_error {
    color: $c-error;
    font-size: 20px;
    position: absolute;
    top: 100%;
    margin-top: 0.5rem;
    @include phone {
      font-size: 14px;
    }
  }
}
</style>
