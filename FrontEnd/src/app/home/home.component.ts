import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database'; 
import { QuoteService } from './quote.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Category = 0;
  quote: string;
  isLoading: boolean;

  testObservable: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.isLoading = true;
    this.testObservable = this.getList('/shop');
    console.log(this.testObservable);
  }

  getList(listPath: any) : Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }

  setCategory(item : any){
    this.Category = item; 
  }

}
