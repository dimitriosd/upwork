import { NgModule } from '@angular/core';

const SHARED_COMPONENTS: any[] = [];

/**
 * The shared module is used to hold all reusable components across the app's
 * different modules. It imports and exports reusable modules to make them
 * readily available to other feature modules just by importing the shared
 * module, avoiding repetition. Since the shared module is meant to be imported
 * by all feature-modules, it shouldn't provide any service.
 */
@NgModule({
	declarations: [...SHARED_COMPONENTS],
	exports: [...SHARED_COMPONENTS],
	/** Do not provide services here, do it in core.module */
})
export class SharedModule {}
