import Image from 'next/image';

import SvgCloseIcon from '../assets/close-icon.svg'

export default function MemberModal({ member, custPrompt, setShowMember }) {
  let screenName, secondaryName;

  if (member.goes_by) {
    screenName = member.goes_by;
    secondaryName = member.first_name + ' ' + member.last_name;
  } else {
    screenName = member.first_name + ' ' + member.last_name;
    secondaryName = null;
  }

  return (
    <div className='member-modal messy'>
      <div className='details'>
        <h4>{screenName}</h4>
        {secondaryName && <h5>{secondaryName}</h5>}
        <div className='details-table'>
          {member.pronouns && (
            <>
              <p className='details-label'>pronouns</p>
              <p>{member.pronouns}</p>
            </>
          )}
          {member.location && (
            <>
              <p className='details-label'>location</p> <p>{member.location}</p>
            </>
          )}
          {member.interests && (
            <>
              <p className='details-label'>interests</p>
              <p>{member.interests}</p>
            </>
          )}
          {member.pets && (
            <>
              <p className='details-label'>pets</p>
              <p>{member.pets}</p>
            </>
          )}
          {member.link && (
            <>
              <p className='details-label'>🔗</p>
              <a href={'//' + member.link}>{member.link}</a>
            </>
          )}
        </div>
      </div>
      {member.avatar && (
        <div className='avatar'>
          <Image
            src={member.avatar}
            alt={`${screenName}'s avatar`}
            layout='fill'
            objectFit='contain'
          />
        </div>
      )}
      {member.custom_answer && (
        <div className='answer'>
          <p className='prompt'>{custPrompt}</p>
          <p>{member.custom_answer}</p>
        </div>
      )}
      <SvgCloseIcon className='close-modal clickme' onClick={() => setShowMember(false)} />
    </div>
  );
}
