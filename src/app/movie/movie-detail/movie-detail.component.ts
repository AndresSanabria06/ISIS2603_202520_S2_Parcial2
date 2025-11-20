import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

import { Movie } from '../Movie';

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit, OnChanges {
  movie: Movie | any = null;
  safeTrailerUrl: SafeResourceUrl | null = null;
  actorWithMostMovies: any = null;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr) {
        const id = Number(idStr);
        this.movieService.getMovie(id).subscribe(m => {
          this.movie = m;
          this.updateTrailerUrl();
          this.findActorWithMostMovies();
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movie']) {
      this.updateTrailerUrl();
    }
  }

  private updateTrailerUrl(): void {
    if (this.movie?.trailer_url) {
      let embedUrl = this.movie.trailer_url;
      if (embedUrl.includes('watch?v=')) {
        embedUrl = embedUrl.replace('watch?v=', 'embed/');
      }
      this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    } else {
      this.safeTrailerUrl = null;
    }
  }

  goBack(): void {
    this.router.navigate(['/movie']);
  }

  private findActorWithMostMovies(): void {
    if (!this.movie || !this.movie.actores || this.movie.actores.length === 0) {
      this.actorWithMostMovies = null;
      return;
    }

    this.actorWithMostMovies = this.movie.actores.reduce((max: any, actor: any) => {
      return actor.peliculas > max.peliculas ? actor : max;
    });
  }
}
