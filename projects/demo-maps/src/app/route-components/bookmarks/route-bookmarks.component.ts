import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, Routes, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

interface BookmarkEntry {
  title: string;
  route: string;
  description?: string;
  previewUrl?: string;
}

@Component({
    selector: 'app-bookmarks',
    templateUrl: './route-bookmarks.component.html',
    styleUrls: ['./route-bookmarks.component.scss'],
    standalone: true,
    imports: [NgFor, RouterLink, NgIf]
})
export class BookmarksComponent implements OnInit {
  @HostBinding('class') class = 'content-container';
  constructor(public router: Router) { }

  routes: Routes;
  availableBookmarks: BookmarkEntry[] = [];
  ngOnInit(): void {
    this.routes = this.router.config.filter(r => r.data);
    this.availableBookmarks = this.routes.map(r => {
      const bookmark: BookmarkEntry = {
        title: r.data.title,
        route: r.path,
        description: r.data.description,
        previewUrl: r.data.img
      }
      return bookmark;
    });
  }

}

