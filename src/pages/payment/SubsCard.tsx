import React from 'react'
import { SubscriptionCardProps } from '../../model/subscription'
import premium from '/assets/images/subs/gold_premium.png';
import basic from '/assets/images/subs/apple_basic.png';

const SubsCard: React.FC<SubscriptionCardProps> = ({plan, isSelected, onSelect}) => {
   return (
      <div className="col-md-6">
         <div className={`card h-100 ${isSelected ? 'border-secondary':''}`}
               style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}
               onClick={() => onSelect(plan.title, plan.price)}>
            <div className="card-body">
               <img src={plan.title == 'Basic' ? basic:premium} className="rounded-lg w-24" alt="상품 이미지" />
               <h5 className="card-title fw-bold">{plan.title}</h5>
               <span className="card-text fs-4">₩{plan.price}</span>
               <span>/월</span>
               <ul className="list-unstyled">
                  {plan.features.map((feature, i) => (
                     <li key={i}>✔️ {feature}</li>
                  ))}
               </ul>
               <button className="btn btn-success select-plan mt-3">선택하기</button>
            </div>
         </div>
      </div>
   );
}

export default SubsCard