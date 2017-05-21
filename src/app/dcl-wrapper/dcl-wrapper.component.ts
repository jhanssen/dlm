import { Component, Compiler, ViewContainerRef, ViewChild, Input, ComponentRef,
         ComponentFactory, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';

import { HttpDownloadComponent } from '../http-download/http-download.component';
import { TorrentDownloadComponent } from '../torrent-download/torrent-download.component';

// Helper component to add dynamic components
@Component({
    selector: 'dcl-wrapper',
    template: `<div #target></div>`
})
export class DclWrapperComponent {
    @ViewChild('target', {read: ViewContainerRef}) target;
    @Input() type;
    @Input() arg;
    cmpRef : ComponentRef<any>;
    private isViewInitialized : boolean = false;

    private stringToComponent : Map<string, Component>;

    constructor(private componentFactoryResolver : ComponentFactoryResolver, private compiler : Compiler,
                private cdRef : ChangeDetectorRef) {
        this.stringToComponent = new Map<string, Component>();
        this.stringToComponent["HttpDownloadComponent"] = HttpDownloadComponent;
        this.stringToComponent["TorrentDownloadComponent"] = TorrentDownloadComponent;
    }

    updateComponent() {
        if(!this.isViewInitialized) {
            return;
        }
        if(this.cmpRef) {
            this.cmpRef.destroy();
        }

        if (typeof this.type == "string") {
            this.type = this.stringToComponent[this.type];
        }
        let factory = this.componentFactoryResolver.resolveComponentFactory(this.type);
        this.cmpRef = this.target.createComponent(factory)
        this.cmpRef.instance.update(this.arg);
        // to access the created instance use
        // this.compRef.instance.someProperty = 'someValue';
        // this.compRef.instance.someOutput.subscribe(val => doSomething());
        this.cdRef.detectChanges();
    }

    ngOnChanges() {
        this.updateComponent();
    }

    ngAfterViewInit() {
        this.isViewInitialized = true;
        this.updateComponent();
    }

    ngOnDestroy() {
        if(this.cmpRef) {
            this.cmpRef.destroy();
        }
    }
}
