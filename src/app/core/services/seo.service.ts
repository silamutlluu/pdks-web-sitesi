import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {}

  init() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data => {
      // The title is automatically handled by Angular's Router if title property is set on the route.
      // But we will handle Meta Description here.
      if (data && data['description']) {
        this.metaService.updateTag({ name: 'description', content: data['description'] });
        this.metaService.updateTag({ property: 'og:description', content: data['description'] });
      }
      
      if (data && data['robots']) {
        this.metaService.updateTag({ name: 'robots', content: data['robots'] });
      } else {
        this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
      }
    });
  }
}
