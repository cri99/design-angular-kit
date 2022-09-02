import { Directive, Input, ElementRef, NgZone, OnInit, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { ItCollapseConfig } from './collapse.config';

/**
 * Per ottimizzare l’ingombro dei contenuti di una pagina si possono usare degli elementi richiudibili
 * (in gergo definiti collassabili o collapse), che possono essere attivati indipendentemente l’uno dall’altro
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[itCollapse]',
  exportAs: 'itCollapse'
})
export class ItCollapseDirective extends NgbCollapse implements OnInit, OnChanges {
  
  constructor(_elementRef: ElementRef<HTMLElement>, _config: ItCollapseConfig, _ngZone: NgZone) {
      super(_elementRef, _config, _ngZone);
  }

  ngOnInit(): void {
    super.ngOnInit();    
    super.collapsed = this.itCollapse;

    super.shown?.subscribe(() => this._isShown = true);
    super.hidden?.subscribe(() => this._isShown = false);
  }

  ngOnChanges({itCollapse}: SimpleChanges): void {
      super.ngOnChanges({collapsed: itCollapse});
  }

  /**
   * La direttiva di collapse che opzionalmente contiene il predicato che ne stabilisce
   * che sarà avvalorato a true quando il collapse è espanso, a false altrimenti
   */
  @Input() itCollapse: boolean;

  private _isShown: boolean = false;
  get isShown(): boolean {
    return this._isShown;
  }
}
