interface ActivityModel {
    _id?: string;
    user_id?: string
    exercise: {value:boolean, checked:boolean}
    water: {value:boolean, checked:boolean}
    sleep: {value:boolean, checked:boolean}
    nonsmoker:{value:boolean, checked:boolean}
    nondrinker:{value:boolean, checked:boolean}
    sunscreen: {value:boolean, checked:boolean}
    date?:Date
}


