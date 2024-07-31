<script lang="ts">
import type { Project } from "$lib/types/project";

export let project: Project;

$: lightColour = project?.colours?.primary?.light?.hex || '';
$: darkColour = project?.colours?.primary?.dark?.hex || '';
</script>
<div>
    {#if project && project.tech_stack?.length}
    <ul class="inline-flex gap-2 flex-row flex-wrap justify-center">
        {#each project.tech_stack as item}
            <li
                class="inline-flex px-2 py-1 uppercase font-semibold tracking-wider text-xs transition-colors cursor-default duration-200 rounded-md h-min whitespace-nowrap" style:background-color={lightColour} style:color={darkColour}
            >
                <h6>{item}</h6>
            </li>
        {/each}
    </ul>
    {/if}
</div>
