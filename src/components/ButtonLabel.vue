<template>
    <div class="button-label">
                <MushyText
                    class="margin-centered button-label-text"
                    :heightPercent="7"
                    :widthPercent="35"
                    :text="label"
                ></MushyText>
    </div>
</template>

<script>
export default {
    name: "ButtonLabel",
    props: {
        label: {
            default() {
                return 'label'
            }
        }
    }
}
</script>

<style scoped>

</style>