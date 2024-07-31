<script>
import "../app.postcss";
import { onNavigate } from '$app/navigation';

onNavigate((navigation) => {
	if (!document.startViewTransition) return;

	return new Promise((resolve) => {
		document.startViewTransition(async () => {
			resolve();
			await navigation.complete;
		});
	});
});
</script>
<div class="w-full h-screen">
    <div class="navbar items-center">
        <div class="navbar-start"></div>
        <h1 class="navbar-end py-8 px-4 header-logo text-2xl text-slate-600"> 
            <a href="/">
                CameronHammel.com 
            </a>
        </h1>
    </div>
    <div class="h-[calc(100vh-112px)]"><slot></slot></div>
</div>
<style lang="scss">
@keyframes fade-in {
	from {
		opacity: 0;
	}
}

@keyframes fade-out {
	to {
		opacity: 0;
	}
}

@keyframes slide-from-right {
	from {
		transform: translateX(30px);
	}
}

@keyframes slide-to-left {
	to {
		transform: translateX(-30px);
	}
}

:root::view-transition-old(root) {
	animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out, 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}

:root::view-transition-new(root) {
	animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in, 300ms cubic-bezier(0.4, 0, 0.2, 1) both
			slide-from-right;
}
</style>
