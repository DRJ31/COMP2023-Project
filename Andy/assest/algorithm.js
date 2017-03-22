//Algorithm of ranking
var arr=[10,9,44,16,51,6];
var rank=[];
 for(var i=0;i<arr.length;i++){
     if(rank.length==0){
         rank.push(arr[i]);
     }
     else{
         for(var j=0;j<rank.length;j++){
             if(arr[i]<=rank[j]){
                 rank.splice(j,0,arr[i]);
                 break;
             }
             else if(arr[i]>rank[rank.length-1]){
                 rank.push(arr[i]);
                 break;
             }
         }
     }

 }
//Algorithm of ranking