import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink, Routes } from '@angular/router';

interface BookmarkEntry {
  title: string;
  route: string;
  description?: string;
  previewUrl?: string;
}


@Component({
  selector: 'app-bookmarks',
  styleUrl: './bookmarks.scss',
  templateUrl: './bookmarks.html',
  imports: [RouterLink],
  host: {
    class: 'content-container'
  }
})
export class Bookmarks {
  routes = signal<Routes>([]);
  availableBookmarks: BookmarkEntry[] = [];

  public router = inject(Router);
  constructor() {
    // old ngOnInit()
    effect(() => {
      this.routes.set(this.router.config.filter(r => r.data));
      this.availableBookmarks = this.routes().map(r => {
        const bookmark: BookmarkEntry = {
          title: r.data?.['title'],
          route: r.path || '',
          description: r.data?.['description'],
          previewUrl: r.data?.['img']
        }
        return bookmark;
      });
    });
  }

}