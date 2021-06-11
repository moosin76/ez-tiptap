export default (vm, target) => {
	console.log(vm.$vnode.tag, target);
	let parent = vm.$parent;
	while(parent != vm.$root) {
		console.log(parent.$vnode.tag, target);
		if(parent.$vnode.tag.indexOf(target) > 0) {
			break;
		}
		parent = parent.$parent;
	}
	return parent;
}