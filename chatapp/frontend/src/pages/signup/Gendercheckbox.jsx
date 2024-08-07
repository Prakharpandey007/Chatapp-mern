const GenderCheckbox = ({oncheckboxchange,selectGender}) => {
    	return (
     		<div className='flex'>
     			<div className='form-control'>
     				<label className={`label gap-2 cursor-pointer ${selectGender==='male' ?"selected":""}`}>
     					<span className='label-text'>Male</span>
     					<input type='checkbox' className='checkbox border-slate-900'
						checked={selectGender ==="male"}
						onChange={()=>oncheckboxchange("male")}
						/>
     				</label>
     			</div>
     			<div className='form-control'>
     				<label className={`label gap-2 cursor-pointer ${selectGender==='female' ?"selected":""}`}>
     					<span className='label-text'>Female</span>
     					<input type='checkbox' className='checkbox border-slate-900'
						checked={selectGender ==="female"}
						onChange={()=>oncheckboxchange("female")}
						/>
     				</label>
 			</div>
     		</div>
     	);
     };
     export default GenderCheckbox;