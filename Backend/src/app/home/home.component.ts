import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { QuoteService } from './quote.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quote: string;
  isLoading: boolean;

  testList: AngularFireList<any>;
  testObservable: Observable<any[]>;

  element = {
    name: "",
    price: 0,
    img: "",
    category: 0
  }

  constructor(private db: AngularFireDatabase) {
    this.testList = this.db.list('shop');
    console.log(this.testList);
  }

  ngOnInit() {
    this.isLoading = true;
    this.testObservable = this.db.list('/shop').snapshotChanges().map(snapshots => {
      return snapshots.map(snapshot => ({
        key: snapshot.key, ...snapshot.payload.val()
      }))
    });

  }
  getList(listPath: any): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }
  insert() {
    let temp = {
      name: "",
      price: 0,
      img: "",
      category: 0
    }

    this.testList.push(this.element);
    this.element = temp;
  }

  update(temp: any) {
    console.log(temp);
    this.testList.update(temp.key, {
      name: temp.name,
      price: temp.price,
      img: temp.img,
      category: temp.category
    });
  }

}
