import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {SessionQuery} from '../stores/session/session.query';

@Directive({selector: '[hasRole]'})
export class HasRoleDirective {

    role: undefined |  'secretary' | 'medic' | 'admin';
    isHidden = true;

    constructor(private element: ElementRef,
                private templateRef: TemplateRef<any>,
                private session: SessionQuery,
                private viewContainer: ViewContainerRef) {}

    @Input()
    set hasRole(val: 'medic' | 'secretary') {
      this.role = val;
      this.updateView();
    }

    private updateView(): void {
        const hasRole = this.role ? this.session.hasRole(this.role) : false;
        if (hasRole) {
            if ( this.isHidden ) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.isHidden = false;
            }
        } else {
            this.viewContainer.clear();
            this.isHidden = true;
        }
    }
}
